from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

@app.route('/upload-receive', methods=['PUT'])
def upload_file():
    print(request.headers)

    uploaded_file = request.files['someFile']
    if uploaded_file.filename != '':
        uploaded_file.save("../../../uploads/" + uploaded_file.filename)
        return {
            "result": "Everything is fine"
        }, 200
    
    return {
        "result": "Not ok"
    }, 500

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=3002)