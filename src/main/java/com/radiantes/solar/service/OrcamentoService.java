package com.radiantes.solar.service;

import com.radiantes.solar.dto.Orcamento;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrcamentoService {

    // Classe auxiliar para guardar os dados da tabela
    private static class KitSolar {
        String nome;
        int geracao;
        double preco;

        public KitSolar(int qtdPlacas, String inversor, int geracao, double preco) {
            this.nome = "Kit " + qtdPlacas + " Placas 585W (Inv. " + inversor + ")";
            this.geracao = geracao;
            this.preco = preco;
        }
    }

    private final List<KitSolar> tabelaDePrecos;

    public OrcamentoService() {
        tabelaDePrecos = new ArrayList<>();
        // --- TRANSCRIÇÃO DA SUA TABELA COMPLETA (Coluna NOVO VALOR) ---
        // (Placas, Inversor, Geração, Preço)
        tabelaDePrecos.add(new KitSolar(4,  "3K",    271,  11385.00));
        tabelaDePrecos.add(new KitSolar(5,  "3K",    339,  12190.00));
        tabelaDePrecos.add(new KitSolar(6,  "3K",    407,  12880.00));
        tabelaDePrecos.add(new KitSolar(7,  "3K",    475,  13455.00));
        tabelaDePrecos.add(new KitSolar(8,  "5K",    543,  14948.85));
        tabelaDePrecos.add(new KitSolar(9,  "5K",    611,  16098.85));
        tabelaDePrecos.add(new KitSolar(10, "5K",    679,  16790.00));
        tabelaDePrecos.add(new KitSolar(11, "5K",    746,  17480.00));
        tabelaDePrecos.add(new KitSolar(12, "5K",    814,  18170.00));
        tabelaDePrecos.add(new KitSolar(13, "6K",    882,  19550.00));
        tabelaDePrecos.add(new KitSolar(14, "6K",    950,  20240.00));
        tabelaDePrecos.add(new KitSolar(15, "6K",    1018, 21848.85));
        tabelaDePrecos.add(new KitSolar(16, "7K",    1086, 22770.00));
        tabelaDePrecos.add(new KitSolar(17, "7K",    1154, 23690.00));
        tabelaDePrecos.add(new KitSolar(18, "7K",    1221, 25760.00));
        tabelaDePrecos.add(new KitSolar(19, "7K",    1289, 26967.50));
        tabelaDePrecos.add(new KitSolar(20, "7K",    1357, 27945.00));
        tabelaDePrecos.add(new KitSolar(21, "8K",    1425, 29898.85));
        tabelaDePrecos.add(new KitSolar(22, "8K",    1493, 30935.00));
        tabelaDePrecos.add(new KitSolar(23, "8K",    1561, 32198.85));
        tabelaDePrecos.add(new KitSolar(24, "10K",   1629, 32890.00));
        tabelaDePrecos.add(new KitSolar(25, "10K",   1697, 33580.00));
        tabelaDePrecos.add(new KitSolar(26, "10K",   1764, 34385.00));
        tabelaDePrecos.add(new KitSolar(27, "10K",   1832, 35650.00));
        tabelaDePrecos.add(new KitSolar(28, "10K",   1900, 36340.00));
        tabelaDePrecos.add(new KitSolar(29, "2x 6K", 1968, 36800.00));
        tabelaDePrecos.add(new KitSolar(30, "2x 6K", 2036, 37490.00));
        tabelaDePrecos.add(new KitSolar(31, "2x 6K", 2104, 38180.00));
    }

    public Orcamento calcularPreco(Double valorConta) {
        // 1. Calcula consumo (Conta / Tarifa Média R$ 0,95)
        double tarifa = 0.95;
        int consumoNecessario = (int) (valorConta / tarifa);

        Orcamento orcamento = new Orcamento();

        // 2. Busca na tabela o PRIMEIRO kit que atende o consumo
        for (KitSolar kit : tabelaDePrecos) {
            if (kit.geracao >= consumoNecessario) {
                orcamento.setNome(kit.nome);
                orcamento.setPreco(kit.preco);
                orcamento.setGeracaoMensal(kit.geracao);
                return orcamento;
            }
        }

        // 3. Se o consumo for maior que o maior kit da tabela (Mansão Gigante)
        // Pega o último kit da lista como base
        KitSolar ultimoKit = tabelaDePrecos.get(tabelaDePrecos.size() - 1);
        orcamento.setNome("Projeto Personalizado (Acima de " + ultimoKit.geracao + " kWh)");
        orcamento.setPreco(0.0); // Preço sob consulta
        orcamento.setGeracaoMensal(consumoNecessario);

        return orcamento;
    }
}