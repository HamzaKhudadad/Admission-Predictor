const ml = require('ml-regression');
const csv1 = require('csvtojson');
const SLR = ml.SLR; // Simple Linear Regression
const csvFilePath = 'Admission/Admission_Predict.csv'; // Data
const fs = require('fs');
const csv = require('csv-parser');

let  csvData =[], // parsed Data
    CGPA = [], // Input
    GREScore=[],
    TOEFLScore=[],
    UniversityRating=[],
    Research=[],
    Out = []; // Output

let calculatedGPA=0;

let gp=0.00 , tf=0.00, gr=0.00, rh=0.00, ui=0.00;
let finl =""

module.exports = {


  call:function (req,res){
    fs.createReadStream(csvFilePath)
     .pipe(csv())
     .on('data', (data) => csvData.push(data))
     .on('end', () => {

       dressData();
        calculatedGPA=req.cgpa*2.5;
        console.log(calculatedGPA);
        pRegression_CGPA(calculatedGPA);
        pRegression_GRE(req.gre);
        pRegression_TOFEL(req.toefl);
        pRegression_Uni(req.uni);
        pRegression_Research(req.research);

       console.log(gp,tf,gr,rh,ui);
      fin=((parseFloat(gp) + parseFloat(tf) + parseFloat(gr)+parseFloat(rh) + parseFloat(ui))/5)*100;
       console.log(fin);
         res.send(fin+"%  Chances of Acceptence");
    })
    console.log("HELLO");

  }


}






function functionc(){
  console.log("check function executing")
}


 function pRegression_CGPA(g){
    let cgpa = new SLR(CGPA, Out);
    gp=(cgpa.predict(parseFloat(g)).toFixed(2));

}
function pRegression_GRE(r){
    let gre = new SLR(GREScore, Out);
    gr=(gre.predict(parseFloat(r)).toFixed(2));
}
function pRegression_TOFEL(t) {
  let  tofel = new SLR(TOEFLScore, Out);
    tf=(tofel.predict(parseFloat(t)).toFixed(2));
}
function pRegression_Uni(u) {
    let uniRating = new SLR(UniversityRating, Out);
    ui=(uniRating.predict(parseFloat(u)).toFixed(2));
}
 function pRegression_Research(s) {
    let research = new SLR(Research, Out);
    rh=(research.predict(parseFloat(s)).toFixed(2));
}

function dressData() {

    csvData.forEach((row) => {
        CGPA.push(f(row.CGPA)); //
        GREScore.push(f(row.GREScore));
        TOEFLScore.push(f(row.TOEFLScore));
        UniversityRating.push(f(row.UniversityRating));
        Research.push(f(row.Research));
        Out.push(f(row.ChanceOfAdmit)); //
    });
}

function f(s) {
    return parseFloat(s);
}
