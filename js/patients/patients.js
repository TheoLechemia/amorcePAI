// Template HTML
var template = require( "./patients.html" );
var formulaire = require( "./formulaireNouveauPatient.html")
require( "./patients.css" );

// Définition du composant
module.exports = function(moduleAngular) {

    var proxyNF = require("../proxy.js")(moduleAngular);

    var ctrlPatients = function( $http, proxyNF, $mdDialog, $mdMedia) {

        var ctrl=this;

        ctrl.nouveauPatient = {
            "patientNumber": "",
            "patientName": "",
            "patientForname":"",
            "patientSex": "",
            "patientBirthday": "",
            "patientFloor": "",
            "patientStreet": "",
            "postalCode": "",
            "patientCity": ""
            };

        ctrl.sexe = [
        {sexe: 'M'}, {sexe: 'F'}
        ];

        ctrl.check = false;
        ctrl.affecterInfirmier = {
            "patient": "",
            "infirmier": ""
        };



        this.submitPatient = function(){
            console.log(ctrl.nouveauPatient);
            proxyNF.ajouterNouveauPatient(ctrl.nouveauPatient);
            if(ctrl.check == true && ctrl.affecterInfirmier.infirmier!=="") {
                ctrl.affecterInfirmier.patient = ctrl.nouveauPatient.patientNumber;
                proxyNF.affecterPatient(ctrl.affecterInfirmier);
            }
        };

    // boite dialogue 
     ctrl.showAlert = function(ev) {
     	   var existePatient = false;

           ctrl.data.objectPatients.forEach(function(patient){
           		console.log(patient.id);
                if(patient.id == ctrl.nouveauPatient.patientNumber) {
                    existePatient = true;
                }
           });
           if (!existePatient){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Information')
                .textContent(ctrl.nouveauPatient.patientForname +' '+ctrl.nouveauPatient.patientName+ ' a été ajouté avec succès aux patients')
                .ariaLabel('Alert Dialog Demo')
                .ok('Retour!')
                .targetEvent(ev)
            );
            console.log("salut");
            }else{
                $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Alerte')
                .textContent("Le patient \" " + ctrl.nouveauPatient.patientForname +' '+ctrl.nouveauPatient.patientName+' \" est déjà enregistré(e)')
                .ariaLabel('Alert Dialog Demo')
                .ok('Retour!')
                .targetEvent(ev)
            );
          };
    };

      //-------------------------    
    };

    // Construire une balise <patient>
    moduleAngular.component( "patient", {
        'template'    : template,
        bindings    : {
            data: "<"
        },
        'controller'    : ctrlPatients
    });

    //Construire une balise <formlaire-new-patient>
    moduleAngular.component( "formulaireNewPatient", {
        'template'    : formulaire,
        bindings    : {
            data: "<"
        },
        'controller'    : ctrlPatients
    });
};