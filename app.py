from flask import Flask, render_template, request, jsonify
import openai
import os
import requests


app = Flask(__name__)
app.config['DEBUG'] = True

openai_key = os.getenv('OPENAI_API_KEY')
if not openai_key:
    raise ValueError('Missing OPENAI API key')

openai.api_key = openai_key


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/symptom-checker')
def symptom_checker():
    input = request.args.get('input')
    response = openai.ChatCompletion.create(model = "gpt-3.5-turbo", messages=[{"role":"system", "content":"You are a health assistant, give detailed information about symptoms given by the user, your response must include: what ailments the diseases may be indicative of, possible first aid treatments, as well as a helpful mealplan or exercise routine. Leave some blank lines, write the text 'MEAL PLAN' or 'EXERCISE ROUTINE' in bold and on a new paragrapgh, then put the meal plan or exercise routhine in a 7-day table that is well formatted use the context to determine whether to give a just a meal plan, or just an exercise routine, or both"}, {"role":"user", "content":f"{input}"}]
    )
    message = response["choices"][0]["message"]["content"]

    return jsonify({'response': message})


@app.route('/to_whisper', methods=['POST'])
def to_whisper():
    url = "https://whisper.lablab.ai/asr"
    payload = {}
    audio_data = request.files['audio_file']
    # files=[ ('audio_file',('test.mp3',open('test.mp3','rb'),'audio/mpeg')) ]
    files = [('audio_file', ('test.mp3', audio_data, 'audio/mpeg'))]
    response_w = requests.request("POST", url, data=payload, files=files)
    input = response_w.json()["text"]
    response = openai.ChatCompletion.create(model = "gpt-3.5-turbo", messages=[{"role":"system", "content":"You are a health assistant, give detailed information about symptoms given by the user, your response must include: what ailments the diseases may be indicative of, possible first aid treatments, as well as a helpful mealplan or exercise routine. Leave some blank lines, write the text 'MEAL PLAN' or 'EXERCISE ROUTINE' in bold and on a new paragrapgh, then put the meal plan or exercise routhine in a 7-day table that is well formatted use the context to determine whether to give a just a meal plan, or just an exercise routine, or both"}, {"role":"user", "content":f"{input}"}]
    )
    message = response["choices"][0]["message"]["content"]

    return jsonify({'response': message})

if __name__ == '__main__':
    app.run(host='0.0.0.0',
    port=3000,
        ssl_context=('cert.pem', 'key.pem')
    )
