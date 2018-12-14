# Small IMDB API 

## Description

This app attempts to create an API for IMDB by making requests to pages and scraping the data. It supports querying for specific data by modifying the IMDB URL.

This is a work in progress so a lot of items might be missing. This project is more so a test of how quick and easy it is to prototype new APIs using Node.js.

## Running The Project

Clone the repo and run `npm start`

The project will load on localhost:3000

## Endpoints

### /imdb/title/search

Params:

- `search_query`: the title that you would like to search for

Returns:

`
[
    {
        "name": "",
        "title_id": "",
        "image": ""
    },
]
`

### /imdb/title/get

Params:

- `title_id`: the title id format that IMDB uses (returned from `/imdb/title/search`)

Returns:

`
{
    "title": "",
    "rating": "",
    "length": "n",
    "genres": [],
    "type": "",
    "year": ""
}
`