import urllib.request
import re

url = "https://www.soundjay.com/heartbeat-sound-effect.html"
try:
    print("Fetching SoundJay page...")
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    )
    with urllib.request.urlopen(req, timeout=15) as response:
        html = response.read().decode('utf-8')
    
    print("Page fetched. Searching for .mp3 links...")
    # Find all href links ending with .mp3
    links = re.findall(r'href="([^"]+\.mp3)"', html)
    
    if links:
        print("Found mp3 files:")
        for l in links:
            print("-", l)
        
        # Download the first heartbeat file (make sure it's absolute URL)
        first_link = links[0]
        if not first_link.startswith('http'):
            dl_url = "https://www.soundjay.com/" + first_link
        else:
            dl_url = first_link
            
        dest = "../assets/heartbeat.mp3"
        print(f"Downloading {dl_url} to {dest}...")
        
        # Download
        req_dl = urllib.request.Request(
            dl_url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        )
        with urllib.request.urlopen(req_dl) as response, open(dest, 'wb') as out_file:
            out_file.write(response.read())
            
        print("Download complete!")
    else:
        print("No mp3 files found.")
except Exception as e:
    print("Error:", e)
