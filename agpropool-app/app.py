from flask import Flask, render_template, request
import logging
app = Flask(__name__)


@app.route('/')
@app.route('/index')
def home():
    return render_template('index.html')

@app.route('/transaction')
def txn():
    return render_template('transaction.html')

@app.route('/sw.js', methods=['GET'])
def sw():
    return app.send_static_file('sw.js')
    
app.run(debug=True)