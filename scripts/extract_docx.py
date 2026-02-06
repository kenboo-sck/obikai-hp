import zipfile
import re
import sys
import os

docx_path = sys.argv[1]
try:
    if not os.path.exists(docx_path):
        print(f"File not found: {docx_path}")
        sys.exit(1)
        
    with zipfile.ZipFile(docx_path) as z:
        xml_content = z.read('word/document.xml').decode('utf-8')
        # Simple regex to clean XML tags. 
        # Note: This joins everything. Paragraphs might be run together.
        # Better approach is to replace </w:p> with newline to preserve paragraphs.
        
        # Replace paragraph end with newline
        xml_content = xml_content.replace('</w:p>', '\n')
        
        # Remove all other tags
        text = re.sub('<[^<]+?>', '', xml_content)
        
        # Reduce multiple newlines
        text = re.sub('\n+', '\n', text)
        
        print(text)
except Exception as e:
    print(f"Error: {e}")
