import { AlunosDispatchContext } from "@/context/AlunosContext";
import { NextApiRequest, NextApiResponse } from "next";
import testemunhos from "../../data/testemunhos";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(testemunhos);
  }

  if (req.method === "POST") {
    const { about, nome, description } = req.body; //destructure
    const newTestemunho = {
      id: testemunhos.length + 1,
      about,
      nome,
      description,
    };
    testemunhos.push(newTestemunho);

    return res
      .status(201)
      .json({ message: "Testemunho adicionado com sucesso!" });
  }
}
