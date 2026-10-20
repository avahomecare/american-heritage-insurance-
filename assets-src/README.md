Binary images stored as base64 text (the repo connector can only write text files).
`scripts/decode-assets.mjs` writes them to `public/images/` at build time.
If you upload the real JPG to public/images/ through GitHub, you can delete the .b64 file.
