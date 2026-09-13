from html.parser import HTMLParser
from pathlib import Path
import unittest

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PAGES = ("index.html", "projetos.html", "cadastro.html")


class DocumentParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.attributes = []

    def handle_starttag(self, tag, attrs):
        self.tags.append(tag)
        self.attributes.append((tag, dict(attrs)))


def parse_page(filename):
    parser = DocumentParser()
    parser.feed((ROOT / filename).read_text(encoding="utf-8"))
    return parser


class SiteStructureTests(unittest.TestCase):
    def test_required_pages_exist(self):
        for filename in PAGES:
            with self.subTest(filename=filename):
                self.assertTrue((ROOT / filename).is_file())

    def test_every_page_has_shared_semantic_structure(self):
        for filename in PAGES:
            with self.subTest(filename=filename):
                parser = parse_page(filename)
                html = next(attrs for tag, attrs in parser.attributes if tag == "html")
                self.assertEqual(html.get("lang"), "pt-BR")
                self.assertEqual(parser.tags.count("h1"), 1)
                for tag in ("header", "nav", "main", "footer"):
                    self.assertIn(tag, parser.tags)
                styles = [attrs.get("href") for tag, attrs in parser.attributes if tag == "link"]
                self.assertIn("css/estilos.css", styles)

    def test_navigation_links_all_pages(self):
        expected = set(PAGES)
        for filename in PAGES:
            with self.subTest(filename=filename):
                parser = parse_page(filename)
                links = {attrs.get("href") for tag, attrs in parser.attributes if tag == "a"}
                self.assertTrue(expected.issubset(links))

    def test_index_has_accessible_responsive_image(self):
        parser = parse_page("index.html")
        self.assertIn("picture", parser.tags)
        sources = [attrs.get("srcset") for tag, attrs in parser.attributes if tag == "source"]
        images = [attrs for tag, attrs in parser.attributes if tag == "img"]
        self.assertIn("imagens/voluntarios.webp", sources)
        self.assertTrue(any(image.get("src") == "imagens/voluntarios.jpg" for image in images))
        self.assertTrue(all(image.get("alt", "").strip() for image in images))

    def test_projects_are_independent_articles(self):
        parser = parse_page("projetos.html")
        self.assertGreaterEqual(parser.tags.count("section"), 3)
        self.assertGreaterEqual(parser.tags.count("article"), 2)
        self.assertIn("picture", parser.tags)

    def test_form_has_four_groups_and_ten_conceptual_fields(self):
        parser = parse_page("cadastro.html")
        self.assertEqual(parser.tags.count("fieldset"), 4)
        controls = [
            attrs for tag, attrs in parser.attributes
            if tag in ("input", "select", "textarea") and attrs.get("name")
        ]
        self.assertLessEqual(len(controls), 10)
        self.assertEqual(
            {control["name"] for control in controls},
            {
                "nome", "cpf", "nascimento", "email", "telefone",
                "cep", "endereco", "cidade", "estado", "participacao",
            },
        )

    def test_strict_fields_use_expected_native_validation(self):
        parser = parse_page("cadastro.html")
        inputs = {
            attrs.get("id"): attrs
            for tag, attrs in parser.attributes
            if tag == "input" and attrs.get("id")
        }
        expected = {
            "cpf": ("text", "[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}", "14"),
            "telefone": ("tel", "\\([0-9]{2}\\) [0-9]{5}-[0-9]{4}", "15"),
            "cep": ("text", "[0-9]{5}-[0-9]{3}", "9"),
        }
        for field_id, (input_type, pattern, maxlength) in expected.items():
            with self.subTest(field_id=field_id):
                field = inputs[field_id]
                self.assertEqual(field.get("type"), input_type)
                self.assertEqual(field.get("pattern"), pattern)
                self.assertEqual(field.get("maxlength"), maxlength)
                self.assertEqual(field.get("inputmode"), "numeric")
                self.assertIn("required", field)

        self.assertEqual(inputs["endereco"].get("autocomplete"), "address-line1")

    def test_images_have_optimized_jpeg_and_webp_variants(self):
        for basename in ("voluntarios", "projeto-alimentos"):
            with self.subTest(basename=basename):
                jpg_path = ROOT / "imagens" / f"{basename}.jpg"
                webp_path = ROOT / "imagens" / f"{basename}.webp"
                self.assertTrue(jpg_path.is_file())
                self.assertTrue(webp_path.is_file())

                with Image.open(jpg_path) as jpg, Image.open(webp_path) as webp:
                    self.assertEqual(jpg.format, "JPEG")
                    self.assertEqual(webp.format, "WEBP")
                    self.assertEqual(jpg.size, webp.size)
                    self.assertGreaterEqual(jpg.width, 1200)

    def test_stylesheet_covers_responsive_accessible_components(self):
        css_path = ROOT / "css" / "estilos.css"
        self.assertTrue(css_path.is_file())
        css = css_path.read_text(encoding="utf-8")
        for selector in (
            ":focus-visible",
            ".grade-projetos",
            ".skip-link",
            ".formulario-container",
            "@media (max-width: 700px)",
            "prefers-reduced-motion",
        ):
            with self.subTest(selector=selector):
                self.assertIn(selector, css)

    def test_stylesheet_defines_twelve_column_grid_and_five_breakpoints(self):
        css = (ROOT / "css" / "estilos.css").read_text(encoding="utf-8")
        self.assertIn("repeat(12, minmax(0, 1fr))", css)
        for width in (1200, 1024, 850, 700, 480):
            with self.subTest(width=width):
                self.assertIn(f"@media (max-width: {width}px)", css)


if __name__ == "__main__":
    unittest.main()
