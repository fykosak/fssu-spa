# Autorizace #
- token based:
    - client pošle na server jméno a heslo
    - server zkontroluje databázi a pokud sedí, vygeneruje token, který pošle na clienta
    - ten si ho uloží v cookie a příště ho už posílá s dotazem
    - server vždy jen ověří token

- JWT (JSON Web Token)