import re, sys
_nombres = [int(n) for n in re.findall(r"-?\d+", sys.stdout.getvalue())]

assert _nombres == [3, 6, 9, 12, 15, 18], "L'affichage doit être 3, 6, 9, 12, 15 puis 18, un par ligne"
