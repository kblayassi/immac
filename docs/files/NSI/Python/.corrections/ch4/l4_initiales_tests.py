assert initiales("ada", "lovelace") == "A.L.", 'initiales("ada", "lovelace") doit renvoyer "A.L."'
assert initiales("Alan", "Turing") == "A.T.", "Ça doit marcher même si les prénoms ont déjà une majuscule"
assert initiales("grace", "hopper") == "G.H.", 'initiales("grace", "hopper") doit renvoyer "G.H."'
assert initiales("katherine", "johnson") == "K.J.", "N'oublie pas le point final"
