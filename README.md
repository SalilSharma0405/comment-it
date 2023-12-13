# Front End Assignment Comment it

This project is deployed at [Deployment Link](https://65795a1121fd83670ec4840b--resilient-muffin-2d9039.netlify.app/).


## Things that are implemented 

- Validate if name and comment text is entered while adding a comment or a reply Each comment or reply should be saved with current date and time.
- The comments and replies should be sortable date and time as shown in the design.
- When user clicks on edit he should be able to only edit the comment text and should not be allowed to edit the name.
- Place the delete button on the border of the comment or reply as shown in the design.
- Persist the data in using one of the web storage so that on refresh of the page data is not lost.
- Make sure to test the application properly before submission.

## Data Structured that was followed

```
head= [
    0.174727542257207,
    0.8021045909932432
]

comments{
    "0.174727542257207": {
        "id": 0.174727542257207,
        "date": "Wed Dec 13 2023 12:55:40 GMT+0530 (India Standard Time)",
        "children": [
            0.07836186415031943
        ],
        "name": "1",
        "comment": "1"
    },
    "0.8021045909932432": {
        "id": 0.8021045909932432,
        "date": "Wed Dec 13 2023 12:55:45 GMT+0530 (India Standard Time)",
        "children": [],
        "name": "2",
        "comment": "2"
    },
    "0.07836186415031943": {
        "id": 0.07836186415031943,
        "date": "2023-12-13T07:25:50.603Z",
        "children": [],
        "name": "3",
        "comment": "3\n"
    }
}

```

