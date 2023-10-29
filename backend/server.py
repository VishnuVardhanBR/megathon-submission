import re
from flask import Flask, jsonify, request
from bs4 import BeautifulSoup
import requests
from transformers import BertTokenizer, BertForSequenceClassification
import json
from sklearn.preprocessing import StandardScaler
import joblib
scaler = StandardScaler()
import numpy as np
from flask_cors import cross_origin
from tweety import Twitter

from transformers import BertTokenizer, BertForSequenceClassification

# Load the model and tokenizer once
tokenizer = BertTokenizer.from_pretrained("Minej/bert-base-personality")
model = BertForSequenceClassification.from_pretrained("Minej/bert-base-personality")

app = Flask(__name__)

@app.route('/', methods=['GET'])
@cross_origin()
def hello():
    return jsonify({'message': 'hello'})

@app.route('/codechef', methods=['GET'])
@cross_origin()
def get_codechef_rating():
    username = request.args.get('username')
    if username is None:
        return jsonify({'error': 'Username parameter is missing.'})

    url = f"https://www.codechef.com/users/{username}"
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        rank_element = soup.find(class_="rating-number")
        problems = soup.find(class_="rating-data-section problems-solved")
        if rank_element:
            rank = rank_element.get_text().strip()
            problem = problems.get_text().strip()
            matches = re.search(r'\((\d+)\)', problem)
            number = matches.group(1)
            return jsonify({'username': username, 'rating': rank, 'problems':number })
        else:
            return jsonify({'error': 'Ranking not found.'})
    else:
        return jsonify({'error': 'Unable to connect to CodeChef.'})

# @app.route('/leetcode', methods=['GET'])
# def leetrate():
#     leetu = request.args.get('username')
#     url = f"https://leetcode.com/{leetu}"
#     response = requests.get(url)
#     if response.status_code == 200:
#         soup = BeautifulSoup(response.content, 'html.parser')
#         rank_element = soup.find(
#             class_="text-[24px] font-medium text-label-1 dark:text-dark-label-1")
#         if rank_element:
#             rank = rank_element.get_text().strip()
#             return jsonify({'username': leetu,'problems': rank})
#         else:
#             return jsonify({'error':'Ranking not found.'})
#     else:
#         return jsonify({'error':'Unable to connect to LeetCode.'})


@app.route('/text', methods=['GET'])
@cross_origin()
def text():
    text = request.args.get('text')
    tokenizer = BertTokenizer.from_pretrained("Minej/bert-base-personality")
    model = BertForSequenceClassification.from_pretrained("Minej/bert-base-personality")

    inputs = tokenizer(text, truncation=True, padding=True, return_tensors="pt")
    outputs = model(**inputs)
    predictions = outputs.logits.squeeze().detach().numpy()

    label_names = ['extroversion', 'neuroticism', 'agreeableness', 'conscientiousness', 'openness']
    result = {label_names[i]: float(predictions[i]) for i in range(len(label_names))}

    return jsonify(result)

@app.route('/store', methods=['POST'])
@cross_origin()
def store_data():
    data = request.get_json()
    key = list(data.keys())[0]
    file_name = f"{key}.json"

    with open(file_name, 'w') as file:
        json.dump(data[key], file)

    return jsonify(message=f'Data stored in {file_name} successfully'), 200


@app.route('/predict_personality', methods=['POST'])
@cross_origin()
def predict_personality():
    model = joblib.load("train_model.pkl")
    data = request.get_json()
    key = list(data.keys())[0]
    age = 12
    gender_no=1
    print(data)
    openness = data['openness']
    neuroticism = data['neuroticism']
    conscientiousness = data['conscientiousness']
    agreeableness = data['agreeableness']
    extroversion = data['extroversion']

    result = np.array([gender_no, age, openness, neuroticism, conscientiousness, agreeableness, extroversion], ndmin=2)
    final = scaler.fit_transform(result)

    personality = str(model.predict(final)[0])

    response = {
        'personality': personality
    }

    return jsonify(response)


@app.route('/tweets',methods=['GET'])
@cross_origin()
def get_tweets():
    uname = request.args.get('uname')

    if uname is not None:
        twitter_app = Twitter("session")
        twitter_app.sign_in("megathon48051", "Krunal@11")

        tweets = twitter_app.get_tweets(uname)
        tweet_texts = [tweet.text for tweet in tweets.tweets]

        return jsonify({'tweets': tweet_texts})
    else:
        return jsonify({'error': 'Please provide a valid "uname" parameter in the URL.'})


def tweethelper(text):
    inputs = tokenizer(text, truncation=True, padding=True, return_tensors="pt")
    outputs = model(**inputs)
    predictions = outputs.logits.squeeze().detach().numpy()

    label_names = ['extroversion', 'neuroticism', 'agreeableness', 'conscientiousness', 'openness']
    result = {label_names[i]: float(predictions[i]) for i in range(len(label_names))}

    return result


@app.route('/analysetweets', methods=['GET'])
@cross_origin()
def analysetweets():
    with open("two.json", 'r') as file:
        data = json.load(file)

    tweets = data['twitter']['tweets']
    total_scores = {'extroversion': 0, 'neuroticism': 0, 'agreeableness': 0, 'conscientiousness': 0, 'openness': 0}

    for tweet in tweets:
        scores = tweethelper(tweet)
        for key in total_scores:
            total_scores[key] += scores[key]

    average_scores = {key: value/(len(tweets)/5) for key, value in total_scores.items()}

    data['twitter']['analysis'] = average_scores

    with open("two.json", 'w') as file:
        json.dump(data, file)

    return jsonify(average_scores)



@app.route('/getone', methods=['GET'])
@cross_origin()
def get_one():
    with open('one.json', 'r') as f:
        data = json.load(f)
    return jsonify(data)


@app.route('/gettwo', methods=['GET'])
@cross_origin()
def get_two():
    with open('two.json', 'r') as f:
        data = json.load(f)
    return jsonify(data)


@app.route('/getthree', methods=['GET'])
@cross_origin()
def get_three():
    with open('two.json', 'r') as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/voice', methods=['POST'])
@cross_origin()
def voice():
    transcript = request.args.get('text')
    response = requests.get(f'http://127.0.0.1:5001/text?text={transcript}')
    json_data = response.json()
    with open('three.json', 'w') as f:
        json.dump(json_data, f)
    return jsonify({"status": "success"})


if __name__ == "__main__":
    app.run(debug=True, port=5001)
