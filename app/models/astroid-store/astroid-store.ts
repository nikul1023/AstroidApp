import { Instance, SnapshotOut, types ,flow} from "mobx-state-tree"
import { Api } from '../../services/api'
/**
 * Model description here for TypeScript hints.
 */

const api = new Api();
api.setup();

export const AstroidStoreModel = types
  .model("AstroidStore")
  .props({
    astroid :  types.optional(types.frozen(), null),
   
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    getAstroidDetails: flow(function* (id:string) {
      
      const result =yield api.getAstroidrDetails(id);
      if(result.kind === "ok") {
         self.astroid =result.astroid;
      } else {
       __DEV__ && console.tron.log(result.kind)
      }
     
  }),
  getRandomAstroid: flow(function* () {
      
    const result =yield api.getAll();
    
    if(result.kind === "ok") {
       self.astroid = result.allastroid[Math.floor(Math.random()*result.allastroid.length)];
    } else {
     __DEV__ && console.tron.log(result.kind)
    }
   
})
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type AstroidStoreType = Instance<typeof AstroidStoreModel>
export interface AstroidStore extends AstroidStoreType {}
type AstroidStoreSnapshotType = SnapshotOut<typeof AstroidStoreModel>
export interface AstroidStoreSnapshot extends AstroidStoreSnapshotType {}
