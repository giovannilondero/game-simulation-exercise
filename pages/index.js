/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { timer, forkJoin } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { switchMap } from 'rxjs/operators';
import { Card, Warning, Image, Name, Quantity } from '../components/resources';
import Alert from '../components/Alert';

const SPEED = {
  FASTEST: 1,
  FAST: 5,
  NORMAL: 15,
};

export default () => {
  const [speed, setSpeed] = useState(SPEED.NORMAL);
  const [population, setPopulation] = useState({ quantity: 0 });
  const [resources, setResources] = useState({
    food: { name: 'Food', minPercentage: 30, quantity: 0 },
    water: { name: 'Water', minPercentage: 20, quantity: 0 },
    stone: { name: 'Stone', minPercentage: 5, quantity: 0 },
    gold: { name: 'Gold', minPercentage: 3, quantity: 0 },
  });
  const [showFamineAlert, setShowFamineAlert] = useState(false);
  const [showEconomicAlert, setShowEconomicAlert] = useState(false);

  const percentageOfPopulation = (percentage) =>
    (population.quantity * percentage) / 100;

  // TODO: debounce click su speed buttons
  // TODO: considerare tempo di risposta e prendere solo ultime richieste effettive
  // TODO: gestione errori

  useEffect(() => {
    const subscription = timer(0, speed * 1000)
      .pipe(
        switchMap(() =>
          forkJoin({
            population: ajax.getJSON('/api/population'),
            food: ajax.getJSON('/api/resources/food'),
            water: ajax.getJSON('/api/resources/water'),
            stone: ajax.getJSON('/api/resources/stone'),
            gold: ajax.getJSON('/api/resources/gold'),
          }),
        ),
      )
      .subscribe(({ population: _population, food, water, stone, gold }) => {
        // Update population
        setPopulation(_population);

        // Update resources
        setResources((oldResources) => ({
          food: { ...oldResources.food, ...food },
          water: { ...oldResources.water, ...water },
          stone: { ...oldResources.stone, ...stone },
          gold: { ...oldResources.gold, ...gold },
        }));

        // Update general alerts
        setShowFamineAlert(
          food.quantity < percentageOfPopulation(20) &&
            water.quantity < percentageOfPopulation(20),
        );
        setShowEconomicAlert(
          gold.quantity < percentageOfPopulation(10) &&
            stone.quantity < percentageOfPopulation(10),
        );
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [speed]);

  if (!population.quantity) {
    return (
      <>
        <main>Loading...</main>
        <style jsx>
          {`
            main {
              height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
          `}
        </style>
      </>
    );
  }

  return (
    <main>
      <Head>
        <title>Dashboard | [Gamename]</title>
      </Head>
      <article>
        {/* Speed control buttons */}
        <section className="margin">
          <div>Reload every {speed} seconds</div>
          <div>
            {[
              ['1x', SPEED.NORMAL],
              ['3x', SPEED.FAST],
              ['15x', SPEED.FASTEST],
            ].map(([text, buttonSpeed]) => (
              <button
                key={text}
                onClick={() => setSpeed(buttonSpeed)}
                type="button"
              >
                {text}
              </button>
            ))}
          </div>
        </section>

        {/* Population */}
        <section className="margin population">
          Population: {population.quantity}
        </section>

        {/* General alerts */}
        {showFamineAlert && (
          <Alert type="warning" className="margin">
            Famine!!!
          </Alert>
        )}
        {showEconomicAlert && (
          <Alert type="warning" className="margin">
            Economic crisis!!!
          </Alert>
        )}

        {/* Resources card */}
        <section className="resources-cards">
          {Object.values(resources).map(
            ({ name, quantity, minPercentage }, index) => (
              <Card className="margin" key={name}>
                {quantity < percentageOfPopulation(minPercentage) ? (
                  <Warning>Resource too low!</Warning>
                ) : (
                  ''
                )}
                {/* index * 5: just used to have different immages */}
                <Image
                  src={`https://placekitten.com/10${index * 5}/10${index * 5}`}
                />
                <Name>{name}</Name>
                <Quantity>{quantity}</Quantity>
              </Card>
            ),
          )}
        </section>
      </article>

      <style jsx>
        {`
          main {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .population {
            font-size: 1.5rem;
          }

          .resources-cards {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
          }
        `}
      </style>
    </main>
  );
};
