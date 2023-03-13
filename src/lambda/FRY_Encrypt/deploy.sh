# first create a zip (using 7-zip) of the entire folder, incl the node_modules subfolder, but exclude deploy.sh (this file)
echo "Step 1/1: Creating deployment zipfile..."
zip a -r FRY_Encrypt.zip -x!deploy.sh