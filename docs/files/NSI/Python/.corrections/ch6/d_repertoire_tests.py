_r = {"Alice": "0612", "Bob": "0798"}

assert numero_de(_r, "Alice") == "0612", "Le numéro d'Alice doit être renvoyé"
assert numero_de(_r, "Zoé") == "inconnu", "Un contact absent doit renvoyer la chaîne inconnu"

ajouter(_r, "Chloé", "0655")
assert _r["Chloé"] == "0655", "Le contact Chloé doit avoir été ajouté"
assert len(_r) == 3, "Le répertoire doit compter trois contacts"

ajouter(_r, "Alice", "0600")
assert _r["Alice"] == "0600", "Ajouter un contact existant doit mettre son numéro à jour"
assert len(_r) == 3, "Mettre à jour un contact ne doit pas en créer un nouveau"

supprimer(_r, "Bob")
assert "Bob" not in _r, "Bob doit avoir été supprimé"
supprimer(_r, "Zoé")
assert len(_r) == 2, "Supprimer un contact inexistant ne doit provoquer aucune erreur"
