from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = ["http://localhost:3000", "localhost:3000"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

colors = [
    {"id": "1", "name": "tomato-light", "hex": "#F5B7B1"},
    {"id": "2", "name": "tomato", "hex": "#D98880"},
    {"id": "3", "name": "eggplant-light", "hex": "#D2B4DE"},
    {"id": "4", "name": "eggplant", "hex": "#D7BDE2"},
    {"id": "5", "name": "ocean-light", "hex": "#85C1E9"},
    {"id": "6", "name": "ocean", "hex": "#7FB3D5"},
    {"id": "7", "name": "grass-light", "hex": "#48C9B0"},
    {"id": "8", "name": "grass", "hex": "#73C6B6"},
    {"id": "9", "name": "mustard-light", "hex": "#F7DC6F"},
    {"id": "10", "name": "mustard", "hex": "#F8C471"},
    {"id": "11", "name": "mustard-dark", "hex": "#EB984E"},
    {"id": "12", "name": "midnight-light", "hex": "#85929E"},
    {"id": "13", "name": "midnight", "hex": "#566573"},
    {"id": "14", "name": "midnight-dark", "hex": "#212F3D"},
]


@app.get("/color", tags=["colors"])
def get_colors() -> dict:
    return {"data": colors}


@app.post("/color", tags=["colors"])
async def add_color(color: dict) -> dict:
    colors.append(color)
    return {"data": {"color added."}}


@app.put("/color/{id}", tags=["colors"])
async def update_color(id: str, body: dict) -> dict:
    for color in colors:
        if color["id"] == id:
            color["name"] = body["name"]
            color["hex"] = body["hex"]
            return {"data": f"color with id {id} has been updated."}

    return {"data": f"color with id {id} not found."}


@app.delete("/color/{id}", tags=["colors"])
def delete_color(id: str) -> dict:
    for color in colors:
        if color["id"] == id:
            colors.remove(color)
            return {"data": f"color with id {id} has been removed."}

    return {"data": f"color with id {id} not found."}
