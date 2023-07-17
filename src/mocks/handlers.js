import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';

export const handlers = [
     
    // get heroes
    rest.get('api/heroes', (req, res, ctx) => {
      const ls = localStorage;
      const filter = req.url.searchParams.get('filter');
      const page = Number(req.url.searchParams.get('page'));
      const pageSize = Number(req.url.searchParams.get('pageSize'));
      const heroes = JSON.parse(ls.getItem('heroes'));
      let heroesFiltered = [];
      for(const hero of heroes) {
        for(const property in hero){
          const propertyValue = '' + hero[property];
          if(propertyValue.toLowerCase().indexOf(filter.toLowerCase()) > -1){
            heroesFiltered.push(hero);
            break;
          }
        }
      }

      const firstElement = page === 0 ? page : (page) * pageSize ;
      const lastElement = heroesFiltered.length < (page + 1) * pageSize ? heroesFiltered.length : (page + 1) * pageSize ;
      const heroesPaginated = heroesFiltered.slice(firstElement, lastElement);  
      console.log('heroesPaginated:', heroesPaginated)
      return res(
          ctx.delay(),
          ctx.status(200),
          ctx.json(
            {
              heroes: heroesPaginated,
              pagination: { page, pageSize, numElements: heroesFiltered.length }
            }
          ),
        )
    }),
    
    //get hero
    rest.get('api/heroes/:id', (req, res, ctx) => {
      const ls = window.localStorage;
      const heroes = JSON.parse(ls.getItem('heroes'));
      const hero = heroes.find(hero => hero.id === req.params.id)
        return res(
          ctx.delay(),
          ctx.status(200),
          ctx.json(
            hero,
          ),
        )
    }),
    //create hero
    rest.post('/api/heroes', async (req, res, ctx) => {
      
      const reqData = await req.json();
      const hero = {id: uuidv4(), name: reqData.name, age: reqData.age, power: reqData.power};
      const ls = window.localStorage;
      const heroes = JSON.parse(ls.getItem('heroes')) || [];
      heroes.push(hero);
      const heroesStr = JSON.stringify(heroes);
      ls.setItem('heroes', heroesStr);

      return res(
        ctx.delay(),
        ctx.status(200),
        ctx.json({
          hero,
        }),
      );
    }),
    //update hero
    rest.put('/api/heroes/:id', async (req, res, ctx) => {
      const id = req.params.id;
      const heroUpdated = await req.json();
      const ls = window.localStorage;
      const heroes = JSON.parse(ls.getItem('heroes')) || [];
      let newHeroes = [];
      for(const hero of heroes) {
       if(hero.id === heroUpdated.id){
        hero.name = heroUpdated.name;
        hero.age = heroUpdated.age;
        hero.power = heroUpdated.power;
       }
      }
      ls.setItem('heroes', JSON.stringify(heroes));
        return res(
          ctx.delay(),
            ctx.status(200),
            ctx.json({
              heroUpdated,
            }),
        )
    }),
    rest.delete('api/heroes/:id', (req, res, ctx) => {
      const ls = window.localStorage;
      const heroes = JSON.parse(ls.getItem('heroes'));
      const newHeroes = heroes.filter(hero => hero.id !== req.params['id']);
      ls.setItem('heroes', JSON.stringify(newHeroes));
        return res(
          ctx.delay(),
          ctx.status(200),
          ctx.json(
            newHeroes
          ),
        )
    })
  ]