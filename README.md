# LUMA Scan

Block explorer for the LUMA network (transactions, ledgers, accounts, pools, health). One static page, served by GitHub Pages from `index.html`.

Live: https://thecreator715.github.io/LUMASCAN/

## Change the node address
Edit `config.json` (`main.ws` is the node's `wss://` address), then:

    node build.js
    git add -A && git commit -m "update" && git push

GitHub Pages: Settings -> Pages -> Deploy from a branch -> `main` / `(root)`.
