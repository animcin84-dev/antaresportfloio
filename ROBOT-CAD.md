# Competition robot CAD slot

The public V2 currently uses the supplied Spline Nexbot as the presentation character. The engineering interface is intentionally ready for the team's real competition robot without inventing specifications.

When the real robot is available:

1. Export a cleaned `robot.glb` from Blender/Fusion/Onshape/SolidWorks workflow.
2. Put it at `public/robot.glb`.
3. Run:

```bash
npm run robot:prepare
```

The command uses the uploaded `gltfjsx-master.zip` workflow via the local `gltfjsx` dev dependency and transforms the GLB into an optimized React-friendly scene.

Recommended node names before export:

- `chassis`
- `left_drive`
- `right_drive`
- `intake`
- `arm`
- `slides`
- `end_effector`
- `electronics`
- `camera`

Do not flatten mechanisms that will need exploded-view or annotation animation.
