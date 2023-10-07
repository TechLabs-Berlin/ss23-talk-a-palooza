A Python package to run recommendations of words that a child can speak based on words spoken previously.

# How to build & run

You need Python 3.9 or later.

Run these commands on your terminal:

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install .
python3 -m ss23_talk_a_palooza
```

# The build

We use [Hatch](https://hatch.pypa.io/) to build and setup this package.

# The APIs

See each section below for a more detailed explanation of each API.

**IMPORTANT**: Some words from the dataset contain some symbols to give a semantic meaning for the word. For example,
               there is an entry `work (action)`. If you want to give this word as **input**, you need to specify the full
               contents: `work (action)`, not just `work`.

## The `/predict` API

Receives a list of words (strings) and returns a list of words (strings).

The input words are received in the body of the request. Example:

```
POST http://127.0.0.1:8000/predict

["ball", "I"]
```

## The `/allowed_words` API

Returns a list of all words allowed to be used as input. These are also all the words that the model can deal with.

This API is meant to be used as a guide to know which words can be used. Specially useful for troubleshooting.
