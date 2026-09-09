# html_ifp_home

A simple static homepage that lists available apps from `apps.json`.

## Local preview

Run a small static server from this folder:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

App buttons open in the same tab and pass the selected size as a URL parameter, for example:

```text
https://edulabs.technikh.com/?size=medium
```
