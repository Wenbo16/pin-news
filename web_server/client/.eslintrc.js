module.exports = {
  "extends": ["airbnb", "prettier"],
    "parser": "babel-eslint",
    "plugins": [
        "react", "prettier"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", "tsx"] }],
        "react/no-did-mount-set-state": 0,
        "react/no-did-update-set-state": 0,
        'max-len': 0,
        'no-plusplus': 0,
        "prettier/prettier": ["error"]

    },
    "env": {
        "browser": true,
        "jest": true
    }
};