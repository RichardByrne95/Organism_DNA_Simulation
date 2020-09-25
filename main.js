//A function that returns a random DNA base.
const returnRandBase = () => {
  //A is Adenine, T is Thymine, C is Cytocine, and G is Guanine.
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
}

//A function that returns a random single strand of DNA containing 15 bases.
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
}

//Specimen Factory Function: creates a random specimen object.
const specimenFactory = (specimenNum, dna) => {
  let obj = {
    specimenNum: specimenNum,
    dna: dna,
    
    //A function to change the DNA of the specimen.
    mutate: function() {
      let randDnaFromObj = dna[dna.length-1];
      let randDnaStrand = returnRandBase();
      
      //A function ensuring replacement DNA base isn't the same as currently selected base.
      function checkForSame(randDnaFromObj, randDnaStrand) {
        if (randDnaFromObj === randDnaStrand) {
          obj.mutate();
        }
      }
      //Calling checkForSame fucntion.
      checkForSame(randDnaFromObj, randDnaStrand);

      //Replacing current base with new base.
      dna[dna.indexOf(randDnaFromObj)] = randDnaStrand;
      return dna;
    },

    //A function to compare DNA strand against another. Return % of DNA in common.
    compareDNA: function(specimen) {
      const currentDNA = this.dna;
      numberOfCommonBases = 0;
      for (i = 0; i < this.dna.length; i++) {
        for (j = 0; j < specimen.length; j++) {
          if (i === j && this.dna[i] === specimen[j]) {
            numberOfCommonBases++;
          }
        }
      }
      commonBasesPercentage = Math.round(numberOfCommonBases/this.dna.length * 100) / 100;
      console.log(`Specimen 1 and Specimen 2 have ${commonBasesPercentage}% DNA in common.`);
    },

    //A function to check if the specimen is likely to survive based on its DNA composition.
    willLikelySurvive: function() {
      let cAndGBases = 0;
      for (i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          cAndGBases++;
        }
      }
      if ((cAndGBases/this.dna.length) >= 0.6) {
        return true;
      } else {
        return false;
      }
    },

    //A function to create a compliment of the current DNA strand.
    complementStrand: function() {
      let complementStrand = [];
      for(i = 0; i < this.dna.length; i++) {
        let dna = this.dna[i];
        if (dna === "A") {
          complementStrand.push("T");
        } else if (dna === "T") {
          complementStrand.push("A");
        } else if (dna === "C") {
          complementStrand.push("G");
        } else if (dna === "G") {
          complementStrand.push("C");
        }
      }
      return complementStrand;
    }
  }
  return obj;
}

//Creating a function to create a list of 30 specimens that are likely to survive.
let thirtySurvivingSpecimens = [];
const create30SurvivingSpecs = () => {
  while (thirtySurvivingSpecimens.length < 30) {
    let spec = specimenFactory(thirtySurvivingSpecimens.length + 1, mockUpStrand());
    if(spec.willLikelySurvive() === true) {
      thirtySurvivingSpecimens.push(spec);
    }
  }
  return thirtySurvivingSpecimens;
}



//Creating a single specimen.
let specimen = specimenFactory(1, mockUpStrand());
console.log(specimen.dna);

//Creating a complement strand for the chosen specimen.
console.log(specimen.complementStrand());

//Simulating a single base mutation in the chosen specimen.
console.log(specimen.mutate());

//Checking whether the specimen will likely survive based on its DNA composition.
console.log(specimen.willLikelySurvive());

//Calling the function to create a list of 30 specimens that are likely to survive.
console.log(create30SurvivingSpecs());
