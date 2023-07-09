# Color Code

## How to Use the App

In your terminal run:

> **git clone git@github.com:andylushman/color-code.git**

You will need [python3](https://www.python.org/downloads/) and [uviconr](https://www.uvicorn.org/) installed to run the server.
navigate to _backend_ and run:

> **python3 main.py**

once the server is running, navigate to _frontend_ and run:

> **npm install**

To run the _react-scripts_ run:

> **npm run start**

To interact with the api you can go to http://localhost:8000/docs#/. To interact with the frontend app you can go to http://localhost:3000/. In general, you should see that the app has the following features:

- List color palettes
- Create color palettes
- Delete color palettes
- Update color palettes
- Search color palettes based on _name_ and _hex_ value
- Copy _hex_ value on _click_ of palette

## Reflection

In this app I used the following technologies:

- [React](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Chakra-UI](https://chakra-ui.com/)
- [Python](https://www.python.org/) - [FastAPI](https://fastapi.tiangolo.com/)

This project was a lot of fun and it gave me an opportunity to see how much I could complete in a short period of time. Being familiar with all of the technologies involved, I feel like I was able to get a clean looking app with a few neat features up and running within a day.

**Areas for improvement:**

- Tests: This app could easily be improved with some unit tests.
- Data management: Currently, this app has some mock data but nothing is being persisted. This could be improved by connecting a database.
- [Pydantic](https://docs.pydantic.dev/latest/): Pydantic could be used in the api along with FastAPI to have _types_.
- Error handling: There isn't really any error handling. This would be nice, especially where the app interacts with the api.
- State management: This is being done with React _context_ and the use of api calls. If given more time, I'd like to introduce something like [React SWR](https://swr.vercel.app/), which could become beneficial if the app were to scale and handle more data and api calls.
- -Form validation: It would be nice to use [React Hook Form](https://www.react-hook-form.com/) instead of doing the vanilla approach which was done. Not sure if it even saved much, if any, time by not using it.
- Accessibility: Semantic markup and _aria-labels_ were used but a lot more could have been done to comply with [WCAG](https://wcag.com/). It would have also be good to go through the entire app using the keyboard and a screen reader.
