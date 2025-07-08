#!/bin/bash
cd /home/kavia/workspace/code-generation/goalpath-visualizer-105184-3a47753d/goal_roadmap_visualizer_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

