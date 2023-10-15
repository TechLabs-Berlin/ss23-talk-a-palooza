in terminal:

```python
python3.9 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

then run:

```python
uvicorn mainy:app --host 0.0.0.0 --port 8001
```

to test, run this request:

testy.http
