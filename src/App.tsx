import { useCallback } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { useForm, joiResolver } from "@mantine/form";
import Joi from "joi";

import { useDB } from "./contexts/Database";

interface IFormValues {
  name: string;
  isGoodBoy: boolean;
}

const schema = Joi.object({
  name: Joi.string().required(),
  isGoodBoy: Joi.boolean().required(),
});

export const App = () => {
  const form = useForm<IFormValues>({
    validate: joiResolver(schema),
    initialValues: {
      name: "",
      isGoodBoy: false,
    },
  });

  const db = useDB();
  const allDogs = useLiveQuery(async () => await db!.dogs.toArray());

  const submitForm = useCallback(
    async (values: IFormValues) => {
      await db!.dogs.add(values);
      form.reset();
    },
    [db, form]
  );

  const removeDog = useCallback(
    async (dogId: number) => {
      await db!.dogs.delete(dogId);
    },
    [db]
  );

  return (
    <div>
      <form onSubmit={form.onSubmit(submitForm)}>
        <input
          type="text"
          {...form.getInputProps("name")}
          placeholder="Type dog name..."
        />
        <label>Is he good boy?</label>
        <input
          type="checkbox"
          {...form.getInputProps("isGoodBoy", { type: "checkbox" })}
        />
        <button type="submit">Add Dog</button>
      </form>

      <small>{JSON.stringify(form.errors)}</small>

      <ul>
        {allDogs?.map((elm) => (
          <li key={elm.id} onClick={() => removeDog(elm.id as number)}>
            {elm.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
