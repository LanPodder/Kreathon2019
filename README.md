# Kreathon2019
Web App that recommends containers based on uploaded image using AI and Maths :)

## Requirements
* .NET Core SDK
* Node.js

## Usage
`dotnet run` will build both the angular aswell as the .NET Core App. + 
After running, upload an image and press "send", to send the image to following API: + 
`https://github.com/notagenius/krefeld_hack` + 
This will detect the material of the Object within the Image and based on that output a bunch of sample Container + 
(Container selection algorithm here is kept very simple because this was only needed for demonstration)
