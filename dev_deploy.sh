#!/bin/bash

## Trocando Referencia do projeto no heroku.
snap run heroku git:remote -a develop-vestylle

## Enviando com -f para o heroku.
git push -f heroku HEAD:master

