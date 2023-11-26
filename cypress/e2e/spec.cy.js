 
    describe('Testes de automação no Trello', () => {
      const apiKey = 'df9c242c8a71001ebe597f51adfacf2a';
      const token = 'ATTA81c68e08b15c135607d9bb5630dc4d9b4d0fb3942f2b5500d7c6e5b7583d78c79C184DB1';
      let boardIdToKeep, listIdToKeep, cardIdToKeep;
      let boardIdToDelete, listIdToDelete, cardIdToDelete;
    
      it('Cadastrar um board e um card para manter', () => {
        // Criar um novo board
        cy.request({
          method: 'POST',
          url: `https://api.trello.com/1/boards/?key=${apiKey}&token=${token}`,
          body: {
            name: 'Board Permanente'
          }
        }).then(response => {
          expect(response.status).to.eq(200);
          boardIdToKeep = response.body.id;
    
          // Criar uma lista no novo board
          cy.request({
            method: 'POST',
            url: `https://api.trello.com/1/lists?key=${apiKey}&token=${token}`,
            body: {
              name: 'Lista Permanente',
              idBoard: boardIdToKeep
            }
          }).then(response => {
            expect(response.status).to.eq(200);
            listIdToKeep = response.body.id;
    
            // Criar um card na lista
            cy.request({
              method: 'POST',
              url: `https://api.trello.com/1/cards?key=${apiKey}&token=${token}`,
              body: {
                name: 'Card Permanente',
                idList: listIdToKeep
              }
            }).then(response => {
              expect(response.status).to.eq(200);
              cardIdToKeep = response.body.id;
            });
          });
        });
      });
    
      it('Cadastrar um board e um card e depois excluí-los', () => {
        // Criar um novo board para exclusão
        cy.request({
          method: 'POST',
          url: `https://api.trello.com/1/boards/?key=${apiKey}&token=${token}`,
          body: {
            name: 'Board para Excluir'
          }
        }).then(response => {
          expect(response.status).to.eq(200);
          boardIdToDelete = response.body.id;
    
          // Criar uma lista no board para exclusão
          cy.request({
            method: 'POST',
            url: `https://api.trello.com/1/lists?key=${apiKey}&token=${token}`,
            body: {
              name: 'Lista para Excluir',
              idBoard: boardIdToDelete
            }
          }).then(response => {
            expect(response.status).to.eq(200);
            listIdToDelete = response.body.id;
    
            // Criar um card na lista para exclusão
            cy.request({
              method: 'POST',
              url: `https://api.trello.com/1/cards?key=${apiKey}&token=${token}`,
              body: {
                name: 'Card para Excluir',
                idList: listIdToDelete
              }
            }).then(response => {
              expect(response.status).to.eq(200);
              cardIdToDelete = response.body.id;
    
              // Excluir o card
              cy.request({
                method: 'DELETE',
                url: `https://api.trello.com/1/cards/${cardIdToDelete}?key=${apiKey}&token=${token}`
              }).then(response => {
                expect(response.status).to.eq(200);
    
                // Excluir o board
                cy.request({
                  method: 'DELETE',
                  url: `https://api.trello.com/1/boards/${boardIdToDelete}?key=${apiKey}&token=${token}`
                }).then(response => {
                  expect(response.status).to.eq(200);
                });
              });
            });
          });
        });
      });
    });
    