// If absolute URL from the remote server is provided, configure the CORS
// header on that server.
var url_altamisa = 'assets/pdf/altamisa.pdf';
var url_amanthe = 'assets/pdf/amanthe.pdf';
var url_palmares = 'assets/pdf/palmares.pdf';

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'assets/js/pdf.worker.js';

// Asynchronous download of PDF
var loadingTask1 = pdfjsLib.getDocument(url_altamisa);
var loadingTask2 = pdfjsLib.getDocument(url_amanthe);
var loadingTask3 = pdfjsLib.getDocument(url_palmares);
var pdf=new Array(loadingTask1,loadingTask2,loadingTask3);

doctos = cargarDocumentos(pdf);
setTimeout(function(){
  getFirstPage(doctos[0]);
}, 3000);



// loadingTask1.promise.then(function(pdf) {
//   console.log('PDF cargado');

  // for (let i = 1; i < pdf.numPages; i++) {
  //     pdf.getPage(i).then(function(page){
  //         console.log('Página: '+i+' cargada');
  //         var scale = 1.5;
  //         var viewport = page.getViewport({
  //             scale: scale
  //         });

  //         var canvas = document.getElementsByClassName('altamisa');
  //         var context = canvas[i].getContext('2d');
  //         canvas[i].height = viewport.height;
  //         canvas[i].width = viewport.width;

  //         var renderContext = {
  //             canvasContext: context,
  //             viewport: viewport
  //           };
  //           var renderTask = page.render(renderContext);
  //           renderTask.promise.then(function() {
  //               console.log('Página renderizada');
  //           });
  //     });
  // }

  // Fetch the first page
//   var pageNumber = 2;
//   pdf.getPage(pageNumber).then(function(page) {
//     console.log('Page loaded');
//     console.log(pdf.numPages);

//     var scale = 1.5;
//     var viewport = page.getViewport({
//       scale: scale
//     });

//     // Prepare canvas using PDF page dimensions
//     var canvas = document.getElementById('altamisa');
//     var context = canvas.getContext('2d');
//     canvas.height = viewport.height;
//     canvas.width = viewport.width;

//     // Render PDF page into canvas context
//     var renderContext = {
//       canvasContext: context,
//       viewport: viewport
//     };
//     var renderTask = page.render(renderContext);
//     renderTask.promise.then(function() {
//       console.log('Page rendered');
//     });
//   });
// }, function(reason) {
//   // PDF loading error
//   console.error(reason);
// });

function cargarDocumentos(array){
  // console.log(array.length);
  var documentos = new Array();
  array.forEach(function(e,i,array){
    e.promise.then(pdf=>{
      console.log(i+' PDF cargado ');
      // console.log(pdf.fingerprint);
      o = {
        id: pdf.fingerprint,
        pdf: pdf
      };
      documentos.push(o);
    }, function(reason){
      console.error(reason);
    });
  });
  //funcion carga los documentos y devuelve arreglo de objetos
  return documentos;
}

//recibe objeto pdf
function getFirstPage(documento){
  d = documento.pdf;
    d.getPage(2).then(page=>{

      var scale = 0.5;
      var viewport = page.getViewport({
        scale: scale
      });

      var altamisa = document.getElementById('altamisa');
      var context = altamisa.getContext('2d');
      altamisa.height = viewport.height;
      altamisa.width = viewport.width;

      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);
      renderTask.promise.then(function() {
        console.log('Page rendered');
      });

    });
}