import os

def recursive_run(di: str):
    for d in os.listdir(di):
        cp = os.path.join(di, d)
        if os.path.isdir(cp):
            recursive_run(cp)
        else:
            fix_file(cp)


def fix_file(path: str):
    if '.md' not in path:
        print('not a markdown', path)
    else:
        print('a markdown file', path)
        if os.path.split(path)[1][0] == '0':
            pname = os.path.split(path)[1][3:]
            os.rename(path, os.path.join(os.path.split(path)[0], pname))


recursive_run('./src/content/docs/guides/')
