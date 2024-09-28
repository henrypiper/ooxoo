// Include the pdf.js library in your HTML file or download and use it locally
// <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.min.js"></script>

function processPDF() {
    const fileInput = document.getElementById('pdfUpload');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const typedarray = new Uint8Array(event.target.result);
            pdfjsLib.getDocument(typedarray).promise.then(pdf => {
                console.log("PDF loaded");
                pdf.getPage(1).then(page => {
                    console.log("Page loaded");
                    const scale = 1.5;
                    const viewport = page.getViewport({ scale: scale });

                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };

                    page.render(renderContext).promise.then(() => {
                        console.log("Page rendered");
                        document.getElementById('output').appendChild(canvas);
                    });
                });
            });
        };

        reader.readAsArrayBuffer(file);
    } else {
        alert('Please upload a PDF file.');
    }
}
