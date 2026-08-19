import re, sys
_nombres = [int(n) for n in re.findall(r"\d+", sys.stdout.getvalue())]

assert len(_nombres) == 10, "Bob fait 10 cueillettes : il doit y avoir 10 lignes"
assert _nombres == list(range(1, 11)), "Bob doit manger 1, puis 2, puis 3 fraises… jusqu'à 10"
