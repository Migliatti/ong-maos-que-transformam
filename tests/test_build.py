from pathlib import Path
import subprocess
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"


class BuildTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        subprocess.run([sys.executable, str(ROOT / "scripts/build.py")], check=True, capture_output=True)

    def test_dist_contains_every_page_and_asset(self):
        for nome in ("index.html", "projetos.html", "cadastro.html", "css/estilos.css", "js/mascaras.js"):
            with self.subTest(nome=nome):
                self.assertTrue((DIST / nome).is_file())

    def test_minified_files_are_smaller(self):
        for nome in ("index.html", "css/estilos.css", "js/mascaras.js"):
            with self.subTest(nome=nome):
                self.assertLess((DIST / nome).stat().st_size, (ROOT / nome).stat().st_size)

    def test_images_are_optimized(self):
        for imagem in (ROOT / "imagens").iterdir():
            with self.subTest(imagem=imagem.name):
                self.assertLess((DIST / "imagens" / imagem.name).stat().st_size, imagem.stat().st_size)


if __name__ == "__main__":
    unittest.main()
