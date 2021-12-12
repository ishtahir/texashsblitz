const router = require('express').Router();
const Team = require('./schema.js');

const capsFirst = (str) => {
  if (str.includes(' ')) {
    const split = str.split(' ');
    let newStr = '';
    split.forEach((word, i) => {
      newStr +=
        word[0].toUpperCase() +
        word.slice(1) +
        (i === split.length - 1 ? '' : ' ');
    });
    return newStr;
  } else {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
  }
};

router.get('/teams', (req, res) => {
  Team.find()
    .exec()
    .then((result) => {
      console.log(`Success getting all documents`);
      res.status(200).json(result);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: err, message: `Error getting all documents` })
    );
});

router.get('/teams/:class', (req, res) => {
  Team.find({ class: Number(req.params.class) })
    .exec()
    .then((result) => {
      console.log(`Success getting all documents`);
      res.status(200).json(result);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: err, message: `Error getting all documents` })
    );
});

router.get('/teams/:class/:division', (req, res) => {
  Team.find({
    class: Number(req.params.class),
    division: Number(req.params.division),
  })
    .exec()
    .then((result) => {
      console.log(`Success getting all documents`);
      res.status(200).json(result);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: err, message: `Error getting all documents` })
    );
});

router.get('/teams/:class/:division/:district', (req, res) => {
  Team.find({
    class: Number(req.params.class),
    division: Number(req.params.division),
    district: Number(req.params.district),
  })
    .exec()
    .then((result) => {
      console.log(`Success getting all documents`);
      res.status(200).json(result);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: err, message: `Error getting all documents` })
    );
});

router.get('/team/:school/:mascot', (req, res) => {
  Team.find({
    school: capsFirst(req.params.school),
    mascot: capsFirst(req.params.mascot),
  })
    .exec()
    .then((result) => {
      console.log(`Success getting all documents`);
      res.status(200).json(result);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: err, message: `Error getting all documents` })
    );
});

router.get('/mascot/:mascot', (req, res) => {
  Team.find({ mascot: capsFirst(req.params.mascot) })
    .exec()
    .then((result) => {
      console.log(`Success getting all documents`);
      res.status(200).json(result);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: err, message: `Error getting all documents` })
    );
});

router.get('/mascot/:mascot/:class', (req, res) => {
  Team.find({
    mascot: capsFirst(req.params.mascot),
    class: Number(req.params.class),
  })
    .exec()
    .then((result) => {
      console.log(`Success getting all documents`);
      res.status(200).json(result);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: err, message: `Error getting all documents` })
    );
});

router.get('/mascot/:mascot/:class/:division', (req, res) => {
  Team.find({
    mascot: capsFirst(req.params.mascot),
    class: Number(req.params.class),
    division: Number(req.params.division),
  })
    .exec()
    .then((result) => {
      console.log(`Success getting all documents`);
      res.status(200).json(result);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: err, message: `Error getting all documents` })
    );
});

router.get('/city/:city', (req, res) => {
  Team.find({
    $or: [
      { city: capsFirst(req.params.city) },
      { city: '', school: capsFirst(req.params.city) },
    ],
  })
    .exec()
    .then((result) => {
      console.log(`Success getting all documents`);
      res.status(200).json(result);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: err, message: `Error getting all documents` })
    );
});

router.get('/city/:city/:class', (req, res) => {
  Team.find({
    class: Number(req.params.class),
    $or: [
      { city: capsFirst(req.params.city) },
      { city: '', school: capsFirst(req.params.city) },
    ],
  })
    .exec()
    .then((result) => {
      console.log(`Success getting all documents`);
      res.status(200).json(result);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: err, message: `Error getting all documents` })
    );
});

router.get('/city/:city/:class/:division', (req, res) => {
  Team.find({
    class: Number(req.params.class),
    division: Number(req.params.division),
    $or: [
      { city: capsFirst(req.params.city) },
      { city: '', school: capsFirst(req.params.city) },
    ],
  })
    .exec()
    .then((result) => {
      console.log(`Success getting all documents`);
      res.status(200).json(result);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: err, message: `Error getting all documents` })
    );
});

router.get('/school/:school', (req, res) => {
  Team.find({ school: capsFirst(req.params.school) })
    .exec()
    .then((result) => {
      console.log(`Success getting all documents`);
      res.status(200).json(result);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: err, message: `Error getting all documents` })
    );
});

router.get('/state/:year', (req, res) => {
  Team.find({ stateAppearances: Number(req.params.year) })
    .exec()
    .then((result) => {
      console.log(`Success getting all documents`);
      res.status(200).json(result);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: err, message: `Error getting all documents` })
    );
});

router.get('/state/:year/:class', (req, res) => {
  Team.find({
    stateAppearances: Number(req.params.year),
    class: Number(req.params.class),
  })
    .exec()
    .then((result) => {
      console.log(`Success getting all documents`);
      res.status(200).json(result);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: err, message: `Error getting all documents` })
    );
});

// ADD NEW TEAMS
router.post('/team/:school/:mascot', (req, res) => {
  const team = new Team(req.body);

  Team.findOne({
    school: capsFirst(req.params.school),
    mascot: capsFirst(req.params.mascot),
  })
    .exec()
    .then((result) => {
      if (result === null) {
        team
          .save()
          .then((_) => {
            res.status(200).json({
              message: `Success creating document: ${req.params.school} ${req.params.mascot}`,
            });
          })
          .catch((err) =>
            res.status(500).json({
              error: err,
              message: `Error creating document: ${req.params.school} ${req.params.mascot}`,
            })
          );
      } else {
        res.status(200).json({
          message: `Document already exists: ${req.params.school} ${req.params.mascot}`,
        });
      }
    });
});

// UPDATE EXISTING TEAMS
router.patch('/team/:school/:mascot/appearance/:year', (req, res) => {
  Team.find({
    school: capsFirst(req.params.school),
    mascot: capsFirst(req.params.mascot)
  })
    .exec()
    .then((result) => {
      if (result.length === 1) {
        const [team] = result;

        if (team) {
          team.stateAppearances.push(Number(req.params.year));
          Team.updateOne(
            {
              school: capsFirst(req.params.school),
              mascot: capsFirst(req.params.mascot),
            },
            { $set: { stateAppearances: team.stateAppearances } }
          )
            .exec()
            .then((result) =>
              res.status(200).json({
                message: `Success updating document: ${req.params.school} ${req.params.mascot}`,
                res: result,
              })
            )
            .catch((err) =>
              res.status(500).json({
                error: err,
                message: `Error updating document: ${req.params.school} ${req.params.mascot}`,
              })
            );
        } else {
          res.status(500).json({
            message: `Could not find team: ${req.params.school} ${req.params.mascot}`,
          });
        }
      } else {
        Team.find({
          school: capsFirst(req.params.school),
          mascot: capsFirst(req.params.mascot),
          city: capsFirst(req.query.city),
        })
        .exec()
        .then((result) => {
            const [team] = result;
    
            if (team) {
              team.stateAppearances.push(Number(req.params.year));
              Team.updateOne(
                {
                  school: capsFirst(req.params.school),
                  mascot: capsFirst(req.params.mascot),
                  city: capsFirst(req.query.city),
                },
                { $set: { stateAppearances: team.stateAppearances } }
              )
                .exec()
                .then((result) =>
                  res.status(200).json({
                    message: `Success updating document: ${req.query.city} ${req.params.school} ${req.params.mascot}`,
                    res: result,
                  })
                )
                .catch((err) =>
                  res.status(500).json({
                    error: err,
                    message: `Error updating document: ${req.query.city} ${req.params.school} ${req.params.mascot}`,
                  })
                );
            } else {
              res.status(500).json({
                message: `Could not find team: ${req.query.city} ${req.params.school} ${req.params.mascot}`,
              });
            }
        });
      }
    });
});

router.patch('/team/:school/:mascot/remove', (req, res) => {
  Team.find({
    school: capsFirst(req.params.school),
    mascot: capsFirst(req.params.mascot),
  })
    .exec()
    .then((result) => {
      console.log('THE RESULT IS...');
      console.log(result);
      const [team] = result;
      team.stateAppearances.pop();

      Team.updateOne(
        {
          school: capsFirst(req.params.school),
          mascot: capsFirst(req.params.mascot),
        },
        { $set: { stateAppearances: team.stateAppearances } }
      )
        .exec()
        .then((result) =>
          res.status(200).json({
            message: `Success updating document: ${req.params.school} ${req.params.mascot}`,
            res: result,
          })
        )
        .catch((err) =>
          res.status(500).json({
            error: err,
            message: `Error updating document: ${req.params.school} ${req.params.mascot}`,
          })
        );
    });
});

// DELETE EXISTING TEAMS
router.delete('/team/:school/:mascot', (req, res) => {
  Team.findOneAndDelete({
    school: capsFirst(req.params.school),
    mascot: capsFirst(req.params.mascot),
  })
    .exec()
    .then((result) =>
      res.status(200).json({
        message: `Success deleting document: ${req.params.school} ${req.params.mascot}`,
        res: result,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
        message: `Error deleting document: ${req.params.school} ${req.params.mascot}`,
      })
    );
});

module.exports = router;
