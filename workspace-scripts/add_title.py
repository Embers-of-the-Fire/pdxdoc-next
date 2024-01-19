import os

def recursive_run(dir: str):
    for d in os.listdir(dir):
        cp = os.path.join(dir, d)
        if os.path.isdir(cp):
            recursive_run(cp)
        else:
            fix_file(cp)


def fix_file(path: str):
    if '.md' not in path:
        print('not a markdown', path)
    else:
        print('a markdown file', path)
        with open(path, 'r', encoding='utf-8') as f:
            title_line = f.readline()
            if '---' == title_line[:3]:
                return
            title = title_line.replace('# ', '').replace('\n', '')
            text = "---\ntitle: {}\n---\n\n".format(title) + title_line + f.read()
        with open(path, 'w', encoding='utf-8') as f:
            f.write(text)


recursive_run('./src/content/docs/guides/')
