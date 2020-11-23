import { AstroidStoreModel, AstroidStore } from "./astroid-store"

test("can be created", () => {
  const instance: AstroidStore = AstroidStoreModel.create({})

  expect(instance).toBeTruthy()
})