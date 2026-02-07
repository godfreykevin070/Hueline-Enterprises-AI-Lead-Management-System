import joblib
import pandas as pd

budget_mapping = {
    'Below ₹10,000': 1,
    '₹10,000 - ₹50,000': 2,
    '₹50,000 - ₹2,00,000': 3,
    '₹2,00,000 - ₹10,00,000': 4,
    'Above ₹10,00,000': 5
}

timeline_mapping = {
    '3+ Months': 1,
    '1-3 Months': 2,
    '1-4 Weeks': 3,
    'Urgent (Within 1 Week)': 4
}

lead_scoring_model = joblib.load("lead_scoring_model.pkl")
label_encoders = joblib.load("label_encoders_model.pkl")

custom_lead = {
    'inquiry_type': 'Bulk Order Inquiry',
    'project_type': 'Commercial',
    'service_needed': 'Commercial Services',
    'budget_range': 'Above ₹10,00,000',
    'project_timeline': 'Urgent (Within 1 Week)',
    'city': 'Mumbai',
    'preferred_contact': 'Phone',
    'message_length': 450
}

features = {}
features['budget_numeric'] = budget_mapping.get(custom_lead['budget_range'], 3)
features['urgency_score'] = timeline_mapping.get(custom_lead['project_timeline'], 2)
features['is_commercial'] = 1 if custom_lead['project_type'] in ['Commercial','Industrial'] else 0
features['is_high_value_inquiry'] = 1 if custom_lead['inquiry_type'] in ['Bulk Order Inquiry','Dealership Inquiry'] else 0
features['detailed_message'] = 1 if custom_lead['message_length'] > 200 else 0
features['message_length'] = custom_lead['message_length']

for col in ['inquiry_type','project_type','service_needed','city','preferred_contact']:
    encoded_col = col + '_encoded'

    if custom_lead[col] in label_encoders[col].classes_:
        features[encoded_col] = label_encoders[col].transform([custom_lead[col]])[0]
    else:
        features[encoded_col] = 0

feature_names = [
    'budget_numeric','urgency_score','is_commercial',
    'is_high_value_inquiry','detailed_message','message_length',
    'inquiry_type_encoded','project_type_encoded',
    'service_needed_encoded','city_encoded','preferred_contact_encoded'
]

X = pd.DataFrame([features])[feature_names]

prediction = lead_scoring_model['model'].predict(X)[0]
probabilities = lead_scoring_model['model'].predict_proba(X)[0]

score_labels = {
    0: {'label': 'Cold Lead', 'action': 'Send automated follow-up in 7 days'},
    1: {'label': 'Warm Lead', 'action': 'Follow up within 48 hours'},
    2: {'label': 'Hot Lead', 'action': 'Contact immediately (within 2 hours)'}
}

result = {
    'predicted_score' : prediction,
    'predicted_label' : score_labels[prediction]['label'],
    'confidence': max(probabilities),
    'probabilities': probabilities,
    'recommended_action': score_labels[prediction]['action'],
}

for i in result:
    print(f"{i:<20}: {result[i]}")