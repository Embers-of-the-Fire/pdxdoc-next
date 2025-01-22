def "uglify out" [path: string] {
    ($path | str substring ..-4) + ".min.js"
}

# Uglify a given file, using swc and uglify-js
def uglify [path: string] {
    let min_path = uglify out $path;
    print $"Processing ($path) ...";
    print $"Calling swc on ($path) ...";
    swc $path -o $min_path;
    print $"Calling uglify-js on ($min_path)";
    uglifyjs --no-module --webkit $min_path -o $min_path -m;
    print "Finished process.";
}

# Uglify all files
def "uglify all" [
    path: string,
    -d, --delete,
] {
    if $d {
        uglify clear $path;
    }
    let files = ls $path | where { not ($in.name | str contains "min") };
    $files | each { |row| uglify $row.name };
    echo "Finished.";
}

# Remove uglified file
def "uglify clear" [path: string] {
    let files = ls $path | where { $in.name | str contains "min" };
    $files | each { |row| rm $row.name };
    echo "Finished.";
}
