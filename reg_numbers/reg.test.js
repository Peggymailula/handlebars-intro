var userReg=[];
describe("Registration Numbers", function(){



    describe("Registration plates format", function(){
        it("should return registration number given with the space format", function() {
          var regPlate = registrationFactoryFunction();
         
          assert.equal("CA 124 399", regPlate.getTown('CA 124 399'));
            
        });
        it("should return registration number written in dash format", function() {
          var regPlate = registrationFactoryFunction();
         
          assert.equal("CL-123-456", regPlate.getTown('CL-123-456'));
            
        });
        it("should return registration number written in a single dash format", function() {
          var regPlate = registrationFactoryFunction();
         
          assert.equal("CY-201316", regPlate.getTown('CY-201316'));
            
        });
      });

      describe("Lower case registration", function(){
        it("should convert lower case registration from Cape Town to upper case", function() {
          var regPlate = registrationFactoryFunction();
         
          assert.equal("CA 124 399", regPlate.caseFormat('ca 124 399'));
            
        });
        it("should convert lower case registration from Bellville to upper case", function() {
          var regPlate = registrationFactoryFunction();
         
          assert.equal("CY 124 399", regPlate.caseFormat('cy 124 399'));
            
        });
        it("should convert lower case registration from Stellenbosch to upper case", function() {
          var regPlate = registrationFactoryFunction();
         
          assert.equal("CA 124 399", regPlate.caseFormat('ca 124 399'));
            
    
        });
      });

    describe("should take in registration plates only from Cape Town,Stellenbosch and Bellville", function(){
  

        it("should return registration number from Cape Town", function() {
          var regPlate = registrationFactoryFunction();
         
          assert.equal("CA 123-259", regPlate.getTown('CA 123-259'));
            
        });


    it("should  return registration number from Bellville", function() {
      var regPlate= registrationFactoryFunction();
      assert.equal("CY 199 709", regPlate.getTown('CY 199 709'));
    });

    it("should be able to return registration number from   Stellenbosch", function() {
      var regPlate = registrationFactoryFunction();
      assert.equal("CL 333 299", regPlate.getTown('CL 333 299'));
    });

  
    
    });


  // describe("should be able to return errors", function(){


  //   it("should return an error message if the is not written in a correct format.", function() {
  //     let reg = registrationFactoryFunction();
  //     assert.deepEqual('Registration is not written in a correct format.', reg.returnErrors('CY 199 199'));
  //   });
  //   it("should return an empty array if the registration number is not recognised", function() {
  //     let reg = registrationFactoryFunction();
  //     assert.deepEqual([], reg.inputTown('CF 199 299'));
  //   });
  // })


  describe("Filtering through towns", function(){
    it("should be able to return registrations from Cape Town", function(){
      var regPlate= registrationFactoryFunction();

     regPlate.regList('CA 884 545')
    regPlate.regList('CA 333 545')
     regPlate.regList('CA 444 545')
     regPlate.regList('CF 884 545')
     regPlate.regList('CY 884 545')


     assert.deepEqual(['CA 444 545','CA 333 545','CA 884 545' ], regPlate.registrations('Cape Town'));

    });

    it("should return registrations from Bellville", function(){
      var regPlate = registrationFactoryFunction();


    userReg=['CA 123-456','CY 333 545','CA 444 545','CY 884 545']
      

     assert.deepEqual(['CY 333 545','CY 884 545'], regPlate.registrations('Bellville'));

    });

    it("should return registrations from Stellenbosch", function(){
      var regPlate = registrationFactoryFunction();

    regPlate.regList('CL 123-456')
    regPlate.regList('CA 333 545')
     regPlate.regList('CL 444 545')
     regPlate.regList('CL 884 545')
     regPlate.regList('CY 884 545')
    

     assert.deepEqual(['CL 884 545', 'CL 444 545', 'CL 123-456'], regPlate.registrations('Stellenbosch'));

    });

  });

});

