export class Schema {

  constructor(db) {
      let Schema = db.Schema;
      let ObjectId = db.ObjectId;

      let Person = new Schema({
          firstName: String
          lastName: String,
          tagId: String,
          isDirty: Boolean
      });



      db.model('person', Person);
  }
}
