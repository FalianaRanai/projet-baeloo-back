use("baeloo");
db.dropDatabase();
use("baeloo");

db.admins.insert(
	{ name: "Admin", username: "admin", password: "d033e22ae348aeb5660fc2140aec35850c4da997", valide: 1, superuser: 1 }
	);

db.categories.insert(
		[
			{idcategorie: 1, nomcategorie: "Hébergement"},
			{idcategorie: 2, nomcategorie: "Restauration"},
			{idcategorie: 3, nomcategorie: "Services professionnels"},
			{idcategorie: 4, nomcategorie: "Commerce de détail"},
			{idcategorie: 5, nomcategorie: "Santé et bien-être"},
			{idcategorie: 6, nomcategorie: "Événements et divertissement"},
			{idcategorie: 7, nomcategorie: "Services automobiles"}
		]
	);

db.souscategories.insert(
	[
		{idcategorie: 1, nomsouscategorie: "Hôtels"},
		{idcategorie: 1, nomsouscategorie: "Auberges"},
		{idcategorie: 1, nomsouscategorie: "Villas et maisons de vacances"},
		{idcategorie: 1, nomsouscategorie: "Chambres d'hôtes"},
		{idcategorie: 1, nomsouscategorie: "Camping et caravaning"},
		{idcategorie: 1, nomsouscategorie: "Locations de vacances"},
		{idcategorie: 2, nomsouscategorie: "Restaurants"},
		{idcategorie: 2, nomsouscategorie: "Cafés et salons de thé"},
		{idcategorie: 2, nomsouscategorie: "Fast-food et plats à emporter"},
		{idcategorie: 2, nomsouscategorie: "Bars et pubs"},
		{idcategorie: 2, nomsouscategorie: "Traiteurs"},
		{idcategorie: 2, nomsouscategorie: "Food trucks"},
		{idcategorie: 3, nomsouscategorie: "Services juridiques"},
		{idcategorie: 3, nomsouscategorie: "Services comptables et financiers"},
		{idcategorie: 3, nomsouscategorie: "Agences de publicité et de marketing"},
		{idcategorie: 3, nomsouscategorie: "Services de conseil en gestion"},
		{idcategorie: 3, nomsouscategorie: "Services de traduction et d'interprétation"},
		{idcategorie: 3, nomsouscategorie: "Services de conception graphique"},
		{idcategorie: 4, nomsouscategorie: "Boutiques de vêtements et de mode"},
		{idcategorie: 4, nomsouscategorie: "Magasins d'électronique"},
		{idcategorie: 4, nomsouscategorie: "Librairies et papeteries"},
		{idcategorie: 4, nomsouscategorie: "Magasins de meubles et d'ameublement"},
		{idcategorie: 4, nomsouscategorie: "Bijouteries et accessoires"},
		{idcategorie: 4, nomsouscategorie: "Magasins de jouets et de jeux"},
		{idcategorie: 5, nomsouscategorie: "Cabinets médicaux et cliniques"},
		{idcategorie: 5, nomsouscategorie: "Spas et centres de bien-être"},
		{idcategorie: 5, nomsouscategorie: "Salles de sport et centres de fitness"},
		{idcategorie: 5, nomsouscategorie: "Instituts de beauté et salons de coiffure"},
		{idcategorie: 5, nomsouscategorie: "Thérapie alternative et holistique"},
		{idcategorie: 5, nomsouscategorie: "Pharmacies et parapharmacies"},
		{idcategorie: 6, nomsouscategorie: "Salles de spectacle et théâtres"},
		{idcategorie: 6, nomsouscategorie: "Cinémas"},
		{idcategorie: 6, nomsouscategorie: "Parcs d'attractions et parcs à thème"},
		{idcategorie: 6, nomsouscategorie: "Salles de jeux et arcades"},
		{idcategorie: 6, nomsouscategorie: "Organisateurs d'événements et d'événements spéciaux"},
		{idcategorie: 6, nomsouscategorie: "Agences d'animation et d'artistes"},
		{idcategorie: 7, nomsouscategorie: "Concessionnaires automobiles"},
		{idcategorie: 7, nomsouscategorie: "Garages et ateliers de réparation"},
		{idcategorie: 7, nomsouscategorie: "Stations-service"},
		{idcategorie: 7, nomsouscategorie: "Lavage et nettoyage de voitures"},
		{idcategorie: 7, nomsouscategorie: "Location de voitures"},
		{idcategorie: 7, nomsouscategorie: "Services de remorquage"},
	]
);


const jointure = db.souscategories.aggregate([{
	$lookup: {
		from: "categories",
		localField: "idcategorie",
		foreignField: "idcategorie",
		as: "category"
	}
}]);

jointure.forEach((element)=>{
	db.souscategories.update( { _id: element._id }, { $set: { idcategorie: element.category[0]._id } } )
});

db.categories.update( {  }, { $unset: { idcategorie: 1 } } );

db.createView("detailscategories", "categories", [
			{
				$lookup: {
					from: "souscategories",
					localField: "_id",
					foreignField: "idcategorie",
					as: "souscategories"
				}
		    }]);

db.createView("detailssouscategories", "souscategories", [
			{
				$lookup: {
					from: "categories",
					localField: "idcategorie",
					foreignField: "_id",
					as: "categories"
				}
		    }]);

