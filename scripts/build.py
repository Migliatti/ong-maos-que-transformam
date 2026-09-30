"""Gera a pasta dist/ pronta para produção.

- minifica HTML, CSS e JavaScript (remove comentários e espaços redundantes);
- redimensiona e recomprime as imagens JPEG/WebP (largura máxima de 1200 px);
- imprime um relatório de tamanhos antes/depois.

Uso: python3 scripts/build.py   (requer Pillow)
"""
import re
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
PAGES = ("index.html", "projetos.html", "cadastro.html")
LARGURA_MAXIMA = 1200


def minificar_html(texto):
    texto = re.sub(r"<!--.*?-->", "", texto, flags=re.S)
    texto = re.sub(r">\s+<", "><", texto)
    texto = re.sub(r"\s{2,}", " ", texto)
    return texto.strip() + "\n"


def minificar_css(texto):
    texto = re.sub(r"/\*.*?\*/", "", texto, flags=re.S)
    texto = re.sub(r"\s+", " ", texto)
    texto = re.sub(r"\s*([{};,>])\s*", r"\1", texto)
    texto = re.sub(r":\s+", ":", texto)
    return texto.replace(";}", "}").strip() + "\n"


def minificar_js(texto):
    linhas = []
    for linha in texto.splitlines():
        linha = linha.strip()
        # remove comentários de linha inteira; não altera strings ou template literals
        if not linha or linha.startswith("//"):
            continue
        linhas.append(linha)
    return "\n".join(linhas) + "\n"


def otimizar_imagem(origem, destino):
    with Image.open(origem) as img:
        if img.width > LARGURA_MAXIMA:
            altura = round(img.height * LARGURA_MAXIMA / img.width)
            img = img.resize((LARGURA_MAXIMA, altura), Image.LANCZOS)
        if origem.suffix == ".webp":
            img.save(destino, "WEBP", quality=78, method=6)
        else:
            img.convert("RGB").save(destino, "JPEG", quality=78, optimize=True, progressive=True)


def tamanho(caminho):
    return caminho.stat().st_size


def main():
    if DIST.exists():
        shutil.rmtree(DIST)
    (DIST / "css").mkdir(parents=True)
    (DIST / "js").mkdir()
    (DIST / "imagens").mkdir()

    relatorio = []
    arquivos = [(ROOT / p, DIST / p, minificar_html) for p in PAGES]
    arquivos.append((ROOT / "css/estilos.css", DIST / "css/estilos.css", minificar_css))
    arquivos.append((ROOT / "js/mascaras.js", DIST / "js/mascaras.js", minificar_js))

    for origem, destino, funcao in arquivos:
        destino.write_text(funcao(origem.read_text(encoding="utf-8")), encoding="utf-8")
        relatorio.append((origem, destino))

    for origem in sorted((ROOT / "imagens").iterdir()):
        destino = DIST / "imagens" / origem.name
        otimizar_imagem(origem, destino)
        relatorio.append((origem, destino))

    total_antes = total_depois = 0
    print(f"{'arquivo':38}{'antes':>10}{'depois':>10}{'economia':>10}")
    for origem, destino in relatorio:
        antes, depois = tamanho(origem), tamanho(destino)
        total_antes += antes
        total_depois += depois
        print(f"{str(origem.relative_to(ROOT)):38}{antes:>10}{depois:>10}{100 - depois * 100 / antes:>9.1f}%")
    print(f"{'TOTAL':38}{total_antes:>10}{total_depois:>10}{100 - total_depois * 100 / total_antes:>9.1f}%")


if __name__ == "__main__":
    main()
