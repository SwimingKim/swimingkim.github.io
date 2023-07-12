import glob
import xml.etree.cElementTree as ET

def add_element(url):
    global root
    doc = ET.SubElement(root, "url")
    ET.SubElement(doc, "loc").text = url


domain = 'https://swimingkim.github.io'

root = ET.Element('urlset')
root.attrib['xmlns'] = "http://www.sitemaps.org/schemas/sitemap/0.9"

add_element(domain)

pages = glob.glob("out/post_*.html") + glob.glob("out/proj_*.html")

for page in pages:
    url = page.replace('out/', domain+"/").replace('.html', '')
    add_element(url)
    print(url)

tree = ET.ElementTree(root)
ET.indent(tree, space="\t", level=0)
tree.write('out/sitemap.xml', encoding='utf-8', xml_declaration=True)

