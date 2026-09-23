import re,base64,pathlib,mimetypes,html
DIST=pathlib.Path('/tmp/ys/dist'); OUT=pathlib.Path('/sessions/gracious-sleepy-cray/mnt/The Carousel Project/03_Output/Website_Astro/_previews')
OUT.mkdir(exist_ok=True)
pages=sorted(DIST.rglob('index.html'))
def route(p):
    r=p.parent.relative_to(DIST).as_posix()
    return '' if r=='.' else r
def prevname(r): return 'preview_index.html' if r=='' else 'preview_'+r.replace('/','-')+'.html'
routemap={('/' if r=='' else '/'+r+'/'):prevname(r) for r in map(route,pages)}
def datauri(path):
    path=pathlib.Path(path)
    if not path.exists(): return None
    mime=mimetypes.guess_type(str(path))[0] or 'application/octet-stream'
    return f"data:{mime};base64,"+base64.b64encode(path.read_bytes()).decode()
def asset(local):  # local like /assets/x.png or /_astro/x.css
    return DIST/local.lstrip('/')
for p in pages:
    r=route(p); h=p.read_text(encoding='utf-8')
    # inline CSS <link rel=stylesheet href=/_astro/*.css>
    def css_sub(m):
        href=m.group(1)
        if href.startswith('/'):
            f=asset(href)
            if f.exists(): return '<style>'+f.read_text(encoding='utf-8')+'</style>'
        return m.group(0)
    h=re.sub(r'<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>',css_sub,h)
    # embed <img src>, <source src>, poster=
    def embed_attr(m):
        pre,src,post=m.group(1),m.group(2),m.group(3)
        if src.startswith('/assets') or src.startswith('/_astro'):
            d=datauri(asset(src))
            if d: return pre+d+post
        return m.group(0)
    h=re.sub(r'(\ssrc=")([^"]+)(")',embed_attr,h)
    h=re.sub(r'(\sposter=")([^"]+)(")',embed_attr,h)
    # embed favicon / apple-touch icons as data URIs so the tab icon shows in offline previews
    h=re.sub(r'(<link[^>]+href=")(/favicon[^"]*|/apple-touch-icon\.png)("[^>]*>)',
             lambda m:(m.group(1)+(datauri(asset(m.group(2))) or m.group(2))+m.group(3)), h)
    # rewrite internal links
    def link_sub(m):
        pre,href,post=m.group(1),m.group(2),m.group(3)
        base=href.split('#')[0]; frag='#'+href.split('#')[1] if '#' in href else ''
        if base in routemap: return pre+routemap[base]+frag+post
        return m.group(0)
    h=re.sub(r'(\shref=")([^"]+)(")',link_sub,h)
    (OUT/prevname(r)).write_text(h,encoding='utf-8')
# START_HERE index
links='\n'.join(f'<li><a href="{prevname(route(p))}">{route(p) or "home"}</a></li>' for p in pages)
(OUT/'START_HERE.html').write_text(f'<!doctype html><meta charset=utf-8><title>Preview index</title><style>body{{font-family:sans-serif;max-width:640px;margin:40px auto;line-height:1.9}}h1{{color:#7A1E2A}}a{{color:#0E4A5E}}</style><h1>Yoga Shakti — site preview</h1><p>Offline, self-contained pages (rebuilt {__import__("datetime").date.today()}).</p><ul>{links}</ul>',encoding='utf-8')
print('previews written:',len(pages))
